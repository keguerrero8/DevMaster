class CreateDiagrams < ActiveRecord::Migration[6.1]
  def change
    create_table :diagrams do |t|
      t.string :name
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
