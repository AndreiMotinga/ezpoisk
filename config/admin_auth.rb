# protect admin related with basic auth
# more at https://stackoverflow.com/a/25212502/2676885
class AdminAuth < Rack::Auth::Basic
  def call(env)
    request = Rack::Request.new(env)

    if %w(admin sidekiq).any? { |w| request.path =~ /\A\/#{w}\/?/ }
      super
    else
      @app.call(env)
    end
  end
end
