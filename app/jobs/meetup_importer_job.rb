# frozen_string_literal: true

# imports meetup, parcel & news from sm
class MeetupImporterJob
  include Sidekiq::Worker
  sidekiq_options queue: "critical"

  def perform
    return unless Rails.env.production?
    Media::Importer.import("public/groups/vk/meetup.yaml", Vk::GroupLoader)
    Media::Importer.import("public/groups/vk/parcel.yaml", Vk::GroupLoader)

    # Media::Importer.import("public/groups/fb/news.yaml", Fb::GroupLoader)
  end
end

Sidekiq::Cron::Job.create(name: "MeetupImporterJob - every 2 hours on 15th min",
                          cron: "15 */2 * * *",
                          class: "MeetupImporterJob")
