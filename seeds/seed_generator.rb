require 'json'
require 'faker'

# Create Users seed
File.open('seeds/entries.json', 'w') do |file|
file.puts('[')  
10.times do
  @temperature = Faker::Number.number(2)
  @dew_point = Faker::Number.number(2)
  @humidity = Faker::Number.number(2)
  @date = Faker::Date.forward(365)
  
  my_hash = {
    temperature: @temperature,
    dew_point: @dew_point,
    humidity: @humidity,
    date: @date
  }
  file.puts(JSON.generate(my_hash) + ",")
end
file.puts("]")
end