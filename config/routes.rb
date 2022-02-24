Rails.application.routes.draw do
  
  resources :users, only: [:create] #create user with signup
  get "me", to: "users#show" #get user session to keep them logged in
  post "login", to: "sessions#create" #create session for user to login
  delete "logout", to: "sessions#destroy" #logout
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
