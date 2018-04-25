class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.references :user, foreign_key: true
      t.boolean :active
      t.text :text
      t.string :state
      t.string :city
      t.string :kind
      t.string :source
      t.string :phone
      t.string :email

      t.timestamps
    end
  end
end
