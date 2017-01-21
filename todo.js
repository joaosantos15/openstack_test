var connection = require('./connection');
 
function Todo() {

	this.get = function(res) {
    connection.acquire(function(err, con) {
      if (err)
        return res.sendStatus(400);
      con.query('select * from es.es_lugg', function(err, result) {
        if(err) {
            con.release();
            return res.send(400, 'Couldnt get a connection');
        }
        con.release();
        res.send(result);
      });
    });

    
  };

this.create = function(todo, res) {
connection.acquire(function(err, con) {
  con.query('insert into GA_MISSIONS set ?', todo, function(err, result) {
    con.release();
    if (err) {
      res.send({status: 1, message: 'TODO creation failed'});
    } else {
      res.send({status: 0, message: 'TODO created successfully'});
    }
  });
});
};

this.update = function(todo, res) {
    connection.acquire(function(err, con) {
      con.query('update GA_MISSIONS set ? where id = ?', [todo, todo.id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'TODO update failed'});
        } else {
          res.send({status: 0, message: 'TODO updated successfully'});
        }
      });
    });
  };

this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from GA_MISSIONS where id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
 
}
module.exports = new Todo();

