class UserDiagram < ApplicationRecord
    belongs_to :user
    belongs_to :diagram
    validates :diagram_id, uniqueness: {scope: :user_id, message: "has already been shared with this user"}
end
