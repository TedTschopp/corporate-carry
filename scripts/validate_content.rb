#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "yaml"

ROOT = File.expand_path("..", __dir__)
ERRORS = []

def load_front_matter(path)
  text = File.read(path)
  return {} unless text.start_with?("---\n")

  _, yaml, = text.split(/^---\s*$/, 3)
  YAML.safe_load(yaml, permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::SyntaxError => e
  ERRORS << "Invalid YAML in #{path.sub("#{ROOT}/", "")}: #{e.message}"
  {}
end

def load_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date, Time], aliases: true) || {}
rescue Psych::SyntaxError => e
  ERRORS << "Invalid YAML in #{path.sub("#{ROOT}/", "")}: #{e.message}"
  {}
end

def docs(pattern)
  Dir.glob(File.join(ROOT, pattern)).sort.map do |path|
    [path, load_front_matter(path)]
  end
end

items = docs("_items/*.md")
pillars = docs("_pillars/*.md")
posts = docs("_posts/*.md")
kits = docs("_kits/*.md")

item_slugs = items.map { |_, data| data["slug"] }.compact
pillar_slugs = pillars.map { |_, data| data["slug"] }.compact
post_slugs = posts.map { |path, data| data["slug"] || File.basename(path, ".md").sub(/^\d{4}-\d{2}-\d{2}-/, "") }
kit_slugs = kits.map { |path, data| data["slug"] || File.basename(path, ".md") }

def rel(path)
  path.sub("#{ROOT}/", "")
end

def expect_slug(kind, slug, allowed, source)
  return if slug.nil? || slug.to_s.empty?
  return if allowed.include?(slug)

  ERRORS << "Missing #{kind} reference '#{slug}' in #{rel(source)}"
end

items.each do |path, data|
  Array(data["pillars"] || data["pillar_ids"]).each { |slug| expect_slug("pillar", slug, pillar_slugs, path) }
  Array(data["related_items"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["alternatives"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["recommended_with"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["appears_in"]).each { |slug| expect_slug("post or kit", slug, post_slugs + kit_slugs, path) }
end

pillars.each do |path, data|
  Array(data["featured_items"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["related_pillars"]).each { |slug| expect_slug("pillar", slug, pillar_slugs, path) }
  Array(data["tier_groups"]).each do |tier|
    Array(tier["items"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  end
  Array(data.dig("compare_table", "rows")).each do |row|
    expect_slug("item", row["item"], item_slugs, path)
  end
end

posts.each do |path, data|
  expect_slug("item", data["primary_item"], item_slugs, path)
  Array(data["items"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["pillars"]).each { |slug| expect_slug("pillar", slug, pillar_slugs, path) }
  Array(data["related_items"]).each { |slug| expect_slug("item", slug, item_slugs, path) }
  Array(data["related_pillars"]).each { |slug| expect_slug("pillar", slug, pillar_slugs, path) }
  Array(data["related_posts"]).each { |slug| expect_slug("post", slug, post_slugs, path) }
  Array(data["inline_products"]).each { |entry| expect_slug("item", entry["item"], item_slugs, path) }
  Array(data.dig("kit", "items")).each { |slug| expect_slug("item", slug, item_slugs, path) }
end

kits.each do |path, data|
  expect_slug("item", data["bag_item"], item_slugs, path)
  Array(data["items"]).each { |entry| expect_slug("item", entry.is_a?(Hash) ? entry["item"] : entry, item_slugs, path) }
end

navigation_path = File.join(ROOT, "_data/navigation.yml")
if File.exist?(navigation_path)
  navigation = load_yaml(navigation_path)
  (Array(navigation["header"]) + Array(navigation["footer_groups"]).flat_map { |group| Array(group["links"]) }).each do |entry|
    expect_slug("pillar", entry["pillar"], pillar_slugs, navigation_path) if entry.is_a?(Hash) && entry["pillar"]
  end
else
  ERRORS << "Missing _data/navigation.yml"
end

legacy_terms = [
  "Amazon", "Anker", "Apple", "Sony", "Bellroy", "Best Buy", "Huckberry", "Goulet", "Nimble",
  "Roost", "Lamy", "Blunt", "Muji", "Tom Bihn", "MacBook", "AirPods", "AirTag", "Notion",
  "Remarkable Paper", "Leuchtturm", "Field Notes", "Aer Day Sling"
]

scan_patterns = %w[_items/**/*.md _pillars/**/*.md _posts/**/*.md _kits/**/*.md _data/**/*.yml *.html]
scan_patterns.flat_map { |pattern| Dir.glob(File.join(ROOT, pattern)) }.uniq.each do |path|
  next if path.end_with?("_data/brand_map.yml")

  text = File.read(path)
  legacy_terms.each do |term|
    next unless text.match?(/\b#{Regexp.escape(term)}\b/)

    ERRORS << "Legacy real-world brand term '#{term}' found in #{rel(path)}"
  end
end

if ERRORS.any?
  warn ERRORS.sort.join("\n")
  exit 1
end

puts "Content validation passed: #{item_slugs.length} items, #{pillar_slugs.length} pillars, #{post_slugs.length} posts, #{kit_slugs.length} kits."