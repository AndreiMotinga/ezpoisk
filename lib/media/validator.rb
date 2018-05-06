# frozen_string_literal: true

module Media
  # validate that listing is fresh, not yet persisted etc
  class Validator
    attr_reader :attrs

    def self.valid?(attrs)
      new(attrs).valid?
    end

    def initialize(attrs)
      @attrs = attrs
    end

    BAD_WORDS = [
      "Russian America",
      "russian-america",
      "ООН",
      "Профессиональная помощь в оформление политического убежища в США!",
      "Смотри рекламу получай деньги! 10часов=250$",
      "ТОЛЬКО НЬЮ ЙОРК\nАНГЛИЙСКИЙ ЯЗЫК ДЛЯ ВСЕХ!!!!",
      "Rio - это",
      "helpdetected.com",
      "Американский визовый центр",
      "almaz89.ilgamos.com",
      "Billionaire.goldandcrypto.com",
      "hrimmigration91@yahoo.com",
      "Продаю SSN",
      "https://crp.center",
      "https://vk.com/englishdiscussion",
      "hiringman.com"
    ].map(&:freeze).freeze

    def valid?
      # return if too_old?
      return if source_imported?
      return if too_short?
      return if vk_post_is_response?
      return if post_contains_bad_words?
      return if same_text_was_added_recently?
      true
    end

    private

    def too_old?
      attrs[:created_at] < 24.hour.ago
    end

    def source_imported?
      attrs[:source] && Listing.where(source: attrs[:source]).any?
    end

    def too_short?
      text.size < 10
    end

    def vk_post_is_response?
      text.match(/\[\w.+\]/).present?
    end

    def post_contains_bad_words?
      BAD_WORDS.any? { |word| text.include?(word) }
    end

    def same_text_was_added_recently?
      Listing.where("created_at > ?", 2.days.ago).exists?(text: text)
    end

    def text
      attrs[:text]
    end
  end
end
