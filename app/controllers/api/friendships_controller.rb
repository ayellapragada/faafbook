class Api::FriendshipsController < ApplicationController
  def index
  end 

  def create
    @requester = User.find friendship_params[:currentUserId]
    @requested = User.find friendship_params[:requestedUserId]
    @requester.friend_request(@requested)
    render 'api/views/friendship', status: 'pending'
  end

  def update
    @requested = User.find friendship_params[:currentUserId]
    @requester = User.find friendship_params[:requesterUserId]

    if friendship_params[:action] == 'approve'
      @requested.accept_request(@requester)
    render 'api/views/friendship', status: 'approved'
    else 
      @requested.decline_request(@requester)
    render 'api/views/friendship', status: 'denied'
    end
  end

  def destroy
    @current_user = User.find friendship_params[:currentUserId]
    @unfriended_user = User.find friendship_params[:requesterUserId]
    @current_user.remove_friend(@unfriended_user)
    render json: 'DELETED!'
  end

  private 

  def friendship_params
    params.require(:friendship).permit(:currentUserId, 
                                       :requestedUserId, 
                                       :requesterUserId, :action)
  end
end
