# frozen_string_literal: true

module Media
  # imports vk and fb posts
  class Importer
    attr_reader :file, :loader

    def self.import(file = "public/groups/vk/housing.yaml", loader = Vk::GroupLoader)
      new(file, loader).import
    end

    def initialize(file, loader)
      @file = file
      @loader = loader
    end

    def import
      groups = YAML.load(File.read(file))
      groups.map { |group| load(group) }.sum
    end

    private

    def load(group)
      loader.load(group)
        .flatten
        .compact
        .uniq { |post| post[:attributes][:text] }
        .select { |post| Media::Validator.valid?(post[:attributes]) }
        .map { |post| Media::Creator.create(post) }
        .size
    end
  end
end
