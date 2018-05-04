import React from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";

const Faq = ({ classes }) => (
  <div className={classes.root}>
    <Paper className={classes.question}>
      <Typography variant="display1" gutterBottom>
        Кто сделал этот сайт?
      </Typography>

      <Typography paragraph>
        Мы - группа ребят родом из России, Украины и Молдовы, кому показалось,
        что в сегодняшний день и век искать информацию должно быть несколько
        легче. Поэтому мы собрались и сделали этот небольшой сайт для комьюнити
        и в частности для себя самих.
      </Typography>
    </Paper>

    <Paper className={classes.question}>
      <Typography variant="display1" gutterBottom>
        Зачем это нужно?
      </Typography>

      <Typography paragraph>
        За неимением лучшего, мы вынуждены пользоваться социальными сетями, для
        того чтобы найти работу, сдать комнату, продать что-нибудь или
        рассказать о своих услугах. И хотя Facebook, Vkontakte и другие неплохо
        справляются с этой задачей, это не совсем то, для чего они были созданы.
        <br />
        <br />
        Наша Цель собрать информацию в одном месте, где ее было бы удобно
        искать. Мы постарались создать удобный фильтр по разделам, городам и
        ключевым словам, чтобы облегчить поиски. Нет нужды сканировать
        повторяющиеся объявления снова и снова, просматривать посты не по теме,
        зря тратить время.
      </Typography>
    </Paper>

    <Paper className={classes.question}>
      <Typography variant="display1" gutterBottom>
        Какова цена объявления?
      </Typography>

      <Typography paragraph>
        Все объявления на сайте являются бесплатными и останутся таковыми
        навсегда.
        <br />
        Без ограничений по времени, разделам и всего прочего.
      </Typography>
    </Paper>

    <Paper className={classes.question}>
      <Typography variant="display1" gutterBottom>
        Как с вами связаться?
      </Typography>

      <Typography paragraph>
        Если у вас есть замечания, пожелания или вопросы, пишите на
        ezpoiskbot@gmail.com
      </Typography>
    </Paper>

    <Typography paragraph className={classes.message}>
      Мы надеемся. сайт будет вам полезен.
      <br />
      <br />
      Всех Благ,
      <br />
      Команда ezpoisk.
    </Typography>
  </div>
);

const styles = {
  root: {
    maxWidth: 700,
    margin: "0 auto"
  },
  question: {
    marginBottom: 20,
    padding: 20
  },
  message: {
    marginTop: 50
  }
};

export default withStyles(styles)(Faq);
