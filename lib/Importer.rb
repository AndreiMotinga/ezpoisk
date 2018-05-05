class Importer
  def initialize
    import
  end

  def import
    page = 0
    url = "https://ea95cc46.ngrok.io"
    loop do
      page += 1
      cur_url = url + "?page=#{page}"
      res = JSON(open(cur_url).read)
      res["data"].each do |listing|
        Listing.create(listing["attributes"])
      end
      p "Processing page #{page} out of #{res['meta']['meta']['total_pages']}"
      break if res["meta"]["meta"]["is_last_page"]
    end
  end
end
