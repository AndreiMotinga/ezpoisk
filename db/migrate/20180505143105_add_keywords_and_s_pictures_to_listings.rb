class AddKeywordsAndSPicturesToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :keywords, :string, array: true, default: []
    add_column :listings, :s_pictures, :string, array: true, default: []
  end
end
