TimeTravel::Application.routes.draw do
  devise_for :users
  resources :friends

  resources :trip_features

  resources :user_preferences

  resources :purchases

  resources :trips do
    member do
      get 'rating'
      post 'update_rating'
    end
  end
  resources :users

  root :to => "trips#index"

  #START: code.index_route
  match 'index' => 'home#index'
  #END: code.index_route  
end
