class AddDefaultValuesToTextOnlistings < ActiveRecord::Migration[5.2]
  def change
    change_column_default :listings, :text, ''
  end
end
