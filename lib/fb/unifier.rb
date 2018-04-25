# frozen_string_literal: true

module Fb
  # changes post received from fb api
  class Unifier
    attr_reader :post, :group

    def self.unify(post, group)
      new(post, group).unify
    end

    def initialize(post, group)
      @post = post
      @group = group
    end

    def unify
      {
        attachments: attachments,
        user: {
          provider: "facebook",
          uid: uid,
          avatar_remote_url: "http://graph.facebook.com/#{uid}/picture?type=normal",
          name: post["from"]["name"]
        },
        attributes: {
          kind: group["kind"],
          active: true,
          text: text,
          state: group["state"],
          city: group["city"],
          source: post["permalink_url"],
          created_at: post["created_time"]
        }
      }
    end

    private

    def uid
      post["from"]["id"]
    end

    def attachments
      Fb::Attachments.new(post["attachments"]).attachments
    end

    def text
      @text ||= Media::Text.clean(post["message"])
    end
  end
end
