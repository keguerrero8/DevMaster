Rails.application.routes.draw do
  
  resources :tasks, only: [:create, :update, :destroy]
  resources :projects, only: [:index, :show, :create, :destroy]
  resources :nodes, only: [:create, :update]
  resources :diagrams, only: [:index, :show, :create, :destroy]
  resources :users, only: [:create]
  post "delete", to: "nodes#deletes" 
  get "me", to: "users#show" 
  post "login", to: "sessions#create" 
  delete "logout", to: "sessions#destroy" 
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
