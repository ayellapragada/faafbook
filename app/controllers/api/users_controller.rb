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
      @profile = Profile.new(user_id: @user.id)
      @profile.save
      render "api/users/show"
    else 
      render json: @user.errors, status: 422 
    end 
  end 

 def show
   @user = User.find(params[:id])
   @profile = @user.profile
   render 'api/users/show'
 end 

#  def update
#    @user = User.find(params[:id])
#  end 

#  def destroy
#    @user = User.find(params[:id])
#  end

end

