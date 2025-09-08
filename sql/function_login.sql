DELIMITER $$

CREATE DEFINER=`root`@`localhost` FUNCTION `login`(
  p_usuario VARCHAR(100),
  p_contrasena_usuario VARCHAR(255)
RETURNS INT
DETERMINISTIC
BEGIN
  DECLARE user_id INT DEFAULT -1;  -- Cambiado a -1 para mejor manejo de errores
  
  SELECT id_usuario INTO user_id
  FROM usuario
  WHERE usuario = p_usuario AND contrasena_usuario = p_contrasena_usuario
  LIMIT 1;
  
  RETURN user_id;  -- Ya es INT, no necesita CAST
END$$

DELIMITER ;