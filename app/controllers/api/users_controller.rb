class Api::UsersController < ApplicationController
  def index
    @users = User.all
    # Getting by using query string in params
    # Need to eventually make this search. No reason to get EVERY user.
  end  

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render "api/users/login"
    else 
      render json: @user.errors, status: 422 
    end 
  end 

  def show
    @user = User.find(params[:id])
    @profile = @user.profile
    if current_user.id == @user.id || current_user.friends_with?(@user) 
      render 'api/users/show'
    #elsif current_user.pending_friends.includes?(@user)
    #  render 'api/users/not_friends', id: '-2'
    else
      @status_code = -1;
      render 'api/users/not_friends'
    end
  end 

  #  def update
  #    @user = User.find(params[:id])
  #  end 

  #  def destroy
  #    @user = User.find(params[:id])
  #  end

end

