Rails.application.routes.draw do
  resources :hello, only: [:index]
  root 'hello#index'
end
