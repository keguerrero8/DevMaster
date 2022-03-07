class RemoveUserIdFromDiagrams < ActiveRecord::Migration[6.1]
  def change
    remove_column :diagrams, :user_id, :integer
  end
end
