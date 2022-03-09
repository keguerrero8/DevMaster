Rails.application.routes.draw do
  
  resources :messages
  resources :conversations
  resources :user_projects
  resources :user_diagrams
  resources :tasks, only: [:create, :update, :destroy]
  resources :projects, only: [:index, :show, :create, :destroy, :update]
  resources :nodes, only: [:create, :update]
  resources :diagrams, only: [:index, :show, :create, :destroy]
  resources :users, only: [:index, :create, :update]
  post "conversation-invite", to: "conversations#invite"
  get "diagram-collaborators/:id", to: "diagrams#collab"
  get "project-collaborators/:id", to: "projects#collab"
  post "delete", to: "nodes#deletes" 
  get "me", to: "users#show" 
  post "login", to: "sessions#create" 
  delete "logout", to: "sessions#destroy" 
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
