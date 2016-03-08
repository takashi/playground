class Greeting
  def initialize(phrase)
    @phrase = phrase
  end

  def exchange
    puts @phrase
  end
end

greeting = Greeting.new('what\'s up?')
greeting.exchange
