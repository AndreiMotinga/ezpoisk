class Classifier
  def self.classify(text)
    new(text).classify
  end

  def self.train
    new.train
  end

  attr_reader :classifier, :text
  def initialize(text = nil)
    redis_url = ENV.fetch("REDISCLOUD_URL") { "redis://localhost:6379/1" }
    redis_backend = ClassifierReborn::BayesRedisBackend.new url: redis_url
    @text = text
    @classifier = ClassifierReborn::Bayes.new KINDS, backend: redis_backend
  end

  def classify
    classifier.classify text
  end

  def train
    KINDS.each do |kind|
      Listing.kind(kind).pluck(:text).uniq.map { |t| classifier.train kind, t }
    end
  end
end
