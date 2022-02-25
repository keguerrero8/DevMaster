class CreateNodes < ActiveRecord::Migration[6.1]
  def change
    create_table :nodes do |t|
      t.string :type
      t.string :label
      t.integer :positionx
      t.integer :positiony
      t.string :source
      t.string :target
      t.integer :diagram_id

      t.timestamps
    end
  end
end
