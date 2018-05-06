# frozen_string_literal: true

# imports real estate from sm
class HousingImporterJob
  include Sidekiq::Worker
  sidekiq_options queue: "critical"

  def perform
    return unless Rails.env.production?
    Media::Importer.import("public/groups/vk/housing.yaml", Vk::GroupLoader)
    # Media::Importer.import("public/groups/fb/housing.yaml", Fb::GroupLoader)
    Ez.ping("Real estate import done")
  end
end

Sidekiq::Cron::Job.create(name: "HousingImporterJob - every 2 hours",
                          cron: "0 */2 * * *",
                          class: "HousingImporterJob")
