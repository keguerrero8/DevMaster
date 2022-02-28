class Project < ApplicationRecord
    has_many :tasks
    belongs_to :user
    validates :title, presence: true, uniqueness: {scope: :user_id}
end
