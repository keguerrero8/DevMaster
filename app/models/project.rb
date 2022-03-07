class Project < ApplicationRecord
    validates :title, presence: true
    has_many :tasks, dependent: :destroy
    has_many :user_projects
    has_many :users, through: :user_projects
end
