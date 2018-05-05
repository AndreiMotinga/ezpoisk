class Importer
  def initialize
    import
  end

  def import
    page = 0
    url = "https://4c93b18c.ngrok.io"
    loop do
      page += 1
      cur_url = url + "?page=#{page}"
      res = JSON(open(cur_url).read)
      res["data"].each do |listing|
        attrs = listing["attributes"]
        attrs["created_at"] = attrs["created_at"].to_datetime
        attrs["updated_at"] = attrs["updated_at"].to_datetime
        Listing.create(attrs)
      end
      p "Processing page #{page} out of #{res['meta']['meta']['total_pages']}"
      break if res["meta"]["meta"]["is_last_page"]
    end
  end
end
