Rails.application.routes.draw do
  get 'welcome/index'
  # new for allowing the user to sign up and create to create the users
  resources :users, only: [:new, :create] 
  # new for the login link, create handle the auth and destroy for logout 
  resource :session, only: [:new, :create, :destroy]

  root to: 'welcome#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end