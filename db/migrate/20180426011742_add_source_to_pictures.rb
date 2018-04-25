class AddSourceToPictures < ActiveRecord::Migration[5.2]
  def change
    add_column :pictures, :source, :string
  end
end
