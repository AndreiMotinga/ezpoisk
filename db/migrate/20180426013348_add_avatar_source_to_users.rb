class AddAvatarSourceToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :avatar_source, :string
  end
end
