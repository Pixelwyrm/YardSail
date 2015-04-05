Rails.application.routes.draw do
  resources :posts

  devise_for :users

  get 'pages/post'

  get 'pages/index'

  root 'pages#landing'
end
