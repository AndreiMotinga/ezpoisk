# frozen_string_literal: true

# modifies vk post for easy creation of the listing
module Vk
  class Unifier
    attr_reader :post, :group, :user

    def self.unify(post, group, user)
      new(post, group, user).unify
    end

    def initialize(post, group, user)
      @post = post
      @group = group
      @user = user
    end

    def unify
      {
        attachments: attachments,
        user: {
          provider: "vkontakte",
          uid: user.id,
          avatar_source: user.photo_100,
          name: "#{user.first_name} #{user.last_name}"
        },
        attributes: {
          kind: kind,
          active: true,
          text: text,
          state: group["state"],
          city: group["city"],
          source: "https://vk.com/topic-#{group['id']}_#{group['topic']}?post=#{post[:id]}",
          created_at: Time.at(post[:date])
        }
      }
    end

    private

    def attachments
      Vk::Attachments.new(post[:attachments]).attachments
    end

    def text
      Media::Text.clean(post[:text])
    end

    def kind
      Classifier.classify(text)
    end
  end
end
