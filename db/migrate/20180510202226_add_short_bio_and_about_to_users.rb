class AddShortBioAndAboutToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :short_bio, :string
    add_column :users, :about, :text
  end
end
