# TODO remove
class Importer
  def self.import
    url = "https://a379093a.ngrok.io/questions"

    res = JSON(open(url).read)
    res["data"].each do |attrs|
      q_attrs = {
        text: attrs["attributes"]["text"],
        slug: attrs["attributes"]["slug"],
        title: attrs["attributes"]["title"],
        user_id: 1
      }
      q = Question.create(q_attrs)

      attrs["attributes"]["answers"].each do |a|
        a_attrs = {
          text: a["text"],
          question_id: q.id
        }
        a = Answer.create(a_attrs)
      end
    end
  end
end
