class AddDefaultValuesToListings < ActiveRecord::Migration[5.2]
  def change
    change_column_default :listings, :kind, 'housing'
    change_column_default :listings, :state, 'new-york'
    change_column_default :listings, :city, 'brooklyn'
    change_column_default :listings, :phone, ''
    change_column_default :listings, :email, ''
  end
end
