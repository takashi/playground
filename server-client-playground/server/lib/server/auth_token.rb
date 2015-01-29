require 'jwt'

# サーバーサイドアプリケーションの場合はシークレットを用いてIDトークンの検証することが可能です。検証には以下のライブラリが利用可能です。
# https://github.com/luciferous/jwt（外部サイト）
# Authorizationリクエスト時に送信するstate値とnonce値を保存します。
# Authorizationエンドポイントのresponse_typeにid_tokenを含めたリクエストを送信し、エンドユーザーに認証・認可をさせます。
# リダイレクトされたときのstate値がAuthorizationリクエスト時のstate値と一致することを確認します。
# id_tokenパラメーターをbase64デコードします。
# JWTのヘッダー部とペイロード部とシグネチャー部の3つへ「.」（ドット）で分割します。
# アプリケーションID発行時のシークレットを用いて、ペイロード部をHMAC-SHA256によって生成した値とシグネチャー部の文字列が一致することを確認します。
# id_token発行元がYahoo! JAPANであることを確認します。
# issの値が"https://auth.login.yahoo.co.jp"と一致すること確認します。
# id_token発行対象のアプリケーションIDであることを確認します。
# audの値が発行時のアプリケーションIDと一致することを確認します。
# id_tokenが有効期限内であることを確認します。
# 現在時刻のタイムスタンプ値がexpの値より小さいことを確認します。
# id_tokenが発行後10分以内であることを確認します。
# iatの値が、「（現在時刻のタイムスタンプ値）-（600秒）」以上であることを確認します。
# id_token内のnonce値がAuthorizationリクエスト時に送信したnonce値と一致することを確認します。
# nonce値が、データベースにストアしてあるnonceと一致することを確認します。
# リプレイアタックを防止するため、確認済のnonce値はデータベースから破棄します。

module JWT
  class InvalidApplication < StandardError; end
  class InvalidTokenError < StandardError; end
end

module AuthToken
  mattr_accessor :token_expire
  @@token_expire = 24.hours.from_now.to_i

  def self.issue_token user_id
    claim = {
      aud: Rails.application.secrets.application_id, # application id
      exp: AuthToken.token_expire, # expire
      iat: Time.now.to_i, # take published date
      user_id: user_id
    }
    JWT.encode(claim, Rails.application.secrets.application_secret)
  end

  def self.valid? token
    p, h = JWT.decode(jwt, Rails.application.secrets.application_secret)
    raise JWT::InvalidApplication.new("Wrong application has passed") if p['aud'] != Rails.application.secrets.application_id
    true
  rescue JWT::ExpiredSignature, JWT::InvalidApplication, JWT::DecodeError, JWT::InvalidTokenError
    false
  end

  # refresh expired token
  def self.refresh(id_token, refresh_token); end
end

# routes

# POST /check_token {id_token=89paj4g89wjefiwoegvnuaiowfjoe}

# POST /authorize {email=hogehgoe@hoge.com, password=password}


# for any request should have...
# - id_token(jwt)
# - refresh token

# in header...
# Authorization: Bearer 89paj4g89wjefiwoegvnuaiowfjoe


# how?: roles

# devise token_authenticatable
class User < ActiveRecord::Base
  include JWTAuthable
end

class AuthController < ActionController::Base
  include JWTAuthable

  # token
  #

  def authorize
    if user = User.authenticate(params[:email], params[:password])
      @token = AuthToken.issue_token(user.id)
    else
    end
  end

  def check_token
    if AuthToken.valid? token
    else
    end
  end
end




