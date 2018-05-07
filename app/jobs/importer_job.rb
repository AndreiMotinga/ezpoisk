# frozen_string_literal: true

# imports housing from sm
class ImporterJob
  include Sidekiq::Worker
  sidekiq_options queue: "critical"

  def perform
    Media::Importer.import("public/groups/vk/housing.yaml", Vk::GroupLoader)
    # Media::Importer.import("public/groups/fb/housing.yaml", Fb::GroupLoader)

    Media::Importer.import("public/groups/vk/jobs.yaml", Vk::GroupLoader)
    # Media::Importer.import("public/groups/fb/jobs.yaml", Fb::GroupLoader)

    Media::Importer.import("public/groups/vk/sales.yaml", Vk::GroupLoader)
    # Media::Importer.import("public/groups/fb/sales.yaml", Fb::GroupLoader)

    Media::Importer.import("public/groups/vk/meetup.yaml", Vk::GroupLoader)
    Media::Importer.import("public/groups/vk/parcel.yaml", Vk::GroupLoader)
    # Media::Importer.import("public/groups/fb/news.yaml", Fb::GroupLoader)

    Ez.ping("Importer done")
  end
end

Sidekiq::Cron::Job.create(name: "ImporterJob - every 2 hours",
                          cron: "0 */2 * * *",
                          class: "ImporterJob")
