class CreateUserDiagrams < ActiveRecord::Migration[6.1]
  def change
    create_table :user_diagrams do |t|
      t.integer :diagram_id
      t.integer :user_id

      t.timestamps
    end
  end
end
