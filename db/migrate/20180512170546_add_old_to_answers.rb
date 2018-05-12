class AddOldToAnswers < ActiveRecord::Migration[5.2]
  def change
    add_column :answers, :old, :boolean
  end
end
