--Inserts config
INSERT INTO config(name, value, created_at)
	VALUES ('slackChannelName', '', now()); -- Inclua o nome do canal, incluindo o #
INSERT INTO config(name, value, created_at)
	VALUES ('slackToken', '', now());       -- Inclua o token do Slack iniciado com "xoxb-"
INSERT INTO config(name, value, created_at)
	VALUES ('apiBaseUrl', '', now());       -- Inclua a url base da própria API
INSERT INTO config(name, value, created_at)
	VALUES ('blingApiUrl', 'https://bling.com.br/Api/v2/pedidos/json', now());       -- Inclua a url base da própria API
INSERT INTO config(name, value, created_at)
	VALUES ('blingApiKey', '', now());       -- Inclua a url base da própria API
INSERT INTO config(name, value, created_at)
	VALUES ('cronExecutionTime', '', now());       -- Inclua o tempo de execução do robô

--Inserts marketplace
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Amazon', '203814973', 'amazon.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Mercado Livre', '203814985', 'mercadolivre.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Skyhub', '', 'skyhub.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Integracommerce', '', 'integracommerce.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Loja Integrada', '203417496', 'lojaintegrada.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Via Varejo', '203814977', 'viavarejo.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Olist', '203761563', 'olist.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Shopee', '203572177', 'shopee.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Madeira Madeira', '203814982', 'madeiramadeira.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Mercostore', '', 'mercostore.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Magalu', '203814984', 'magalu.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Webcontinental', '203870867', 'webcontinental.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Leroy Merlin', '203937139', 'leroymerlin.png', now());
INSERT INTO marketplace(name, number, url, created_at)
	VALUES ('Americanas', '203814975', 'americanas.png', now());