class Api::PostsController < ApplicationController
  before_action :set_post, except: [:index, :create]

  def index
    @posts = Post.all
  end

  def show
  end

  def create
    @post = Post.new(post_params)

    if @post.save
    else
    end
  end

  def update
    if @post.update(post_params)
    else
    end
  end

  def destroy
    if @post.destroy
    else
    end
  end

  private
  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
