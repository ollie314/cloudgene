package cloudgene.server.resources;
/**
 * @author seppinho
 *
 */
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import org.restlet.representation.StringRepresentation;

import cloudgene.core.programs.Program;
import cloudgene.core.programs.Programs;
import cloudgene.user.User;
import cloudgene.user.UserSessions;


public class GetPrograms extends ServerResource {

	
	@Get
	public Representation getPrograms() {

		UserSessions sessions = UserSessions.getInstance();
		User user = sessions.getUserByRequest(getRequest());
		if (user != null) {
			
			Map<String, Program> progs = Programs.getInstance().getProgs();
			if(!progs.isEmpty()){
			System.out.println("DAT "+progs.get("CloudBurst"));
			JsonConfig config = new JsonConfig();
			Map<String, Program> sortedMap = new TreeMap<String, Program>(progs);
			config.setExcludes(new String[] { "mapred", "installed", "cluster"});
			JSONArray jsonArray = JSONArray.fromObject(sortedMap.values(),config);
			return new StringRepresentation(jsonArray.toString());
			}

		}
		return new StringRepresentation("Progs not loaded");

	}

}
