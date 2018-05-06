class AddIndexToFieldsOnListings < ActiveRecord::Migration[5.2]
  def change
    add_index :listings, :state
    add_index :listings, :city
    add_index :listings, :kind
  end
end
