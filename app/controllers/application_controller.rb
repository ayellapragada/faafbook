class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname,
                                 :month, :date, :year, :gender)
  end


  def profile_params
    params.require(:profile).permit(:about, :phone, :education, :website, :language,
                                    :location, :work, :relationship)
  end

  def post_params
    params.require(:post).permit(:author_id, :receiver_id, 
                                 :body, :page_number, :how_many)
  end

  def prepare_user_for_show(user, friend_count = 9, photo_count = 9)
    profile_album_id = user.albums.find_by(name: "Profile")


    @profile = user.profile
    @friends = user.friends.order("created_at DESC").limit(friend_count)
    @photos = user.photos
      .where.not(album_id: profile_album_id)
      .order("created_at DESC")
      .limit(photo_count)
  end

  def last_message_read 
    if @messages.last 
      if @messages.last.user_id != current_user.id 
        @messages.last.update(read: true)
      end 
    end 
  end

  def notification_trigger(recipient_ids)
    Pusher.trigger('notifications', 'new_notification',
                   {recipient_ids: recipient_ids})
  end

  def current_user
    if session 
      session_token = session[:session_token] 
    elsif params[:session]
      session_token = params[:session][:session_token] 
    end
    @current_user ||= User.find_by session_token: session_token
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end
end
