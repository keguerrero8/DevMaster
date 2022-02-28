class Task < ApplicationRecord
    belongs_to :project
    validates :content, presence: true
    validates :status, presence: true
end
