class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :content
      t.integer :project_id
      t.string :status
      t.integer :order

      t.timestamps
    end
  end
end
