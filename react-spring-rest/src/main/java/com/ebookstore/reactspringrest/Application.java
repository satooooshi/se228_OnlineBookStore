package com.ebookstore.reactspringrest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import java.util.List;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Application {

	private static final Logger logger = LoggerFactory.getLogger(Application.class);

	public static void main(String args[]) {
		SpringApplication.run(Application.class);
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}

	@Autowired
	private VolumeRepository volumeRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private UserRepository userRepository;

	@Bean
	public CommandLineRunner run(RestTemplate restTemplate) throws Exception {

		return args -> {
			logger.info("Welcome to the online book store System!");

			//userRepository.save(new User("user","user@qq.com","https://camo.qiitausercontent.com/7e4b270d088fb9d905a09c11e15ae4fd09d39d80/68747470733a2f2f617661746172732e67697468756275736572636f6e74656e742e636f6d2f6b77616b6131323038","user","user"));
			//userRepository.save(new User("admin","admin@qq.com","https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg","admin","admin"));


			//orderItemRepository.save(new OrderItem(1l,1l,1));
/*

			//
			//q=packt&maxResults=40
			//
			QueryResult queryResult = restTemplate.getForObject(
					"https://www.googleapis.com/books/v1/volumes?q=packt&maxResults=40", QueryResult.class);
			//log.info(queryResult.showList());

			//queryResult.showList();
			List<Items>items=queryResult.getItemsList();


			for(Items item:items){
				VolumeInfo volumeInfo=item.getVolumeInfo();
				Float price=item.getPriceAmount();
				//System.out.println("--price MXN:"+price);
				//System.out.println("--currencyCode:"+item.getCurrencyCode());
				//Volume volume=new Volume();
				//System.out.println(volumeInfo.getTitle());
				//System.out.println(volumeInfo.getPublisher());
				//System.out.println(volumeInfo.getPublishedDate());
				volumeRepository.save(new Volume(
						volumeInfo.getTitle(),
						volumeInfo.getSubtitle(),
						volumeInfo.getFirstAuthor(),
						volumeInfo.getPublisher(),
						volumeInfo.getPublishedDate(),
						volumeInfo.getDescription(),
						volumeInfo.getPageCount(),
						volumeInfo.getFirstCategory(),
						volumeInfo.getAverageRating(),
						volumeInfo.getFirstImageLinks(),
						volumeInfo.getLanguage(),
						price
				));
			}

			logger.info("books finished introducing to mySQL!!");

*/



		};
	}
}