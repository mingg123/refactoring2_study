//리팩토링 전
public static void main(String [] args) {
    try {
        if(args.length ==0) throw new RunTimeException("파일명을 입력하세요.");
        String filename = args[args.length -1];
        File input = Paths.get(filename).toFile();
        ObjectMapper mapper = new ObjectMapper();
        Order[] orders = mapper.readValue(input, Order[].class);
        if(Stream.of(args).anyMath(arg -> "-r".equals(arg))) {
            System.out.println(Stream.of(orders).filter(o-> "read".equals(o.status)).count())
        } else {
            System.out.println(orders.length);
        } 
    }catch (Exception e) {
        System.err.println(e);
        System.exit(1);
    }
}

//리팩토링 후

public static void main(String [] args) {
    try{
        System.out.println(run(args));
    }catch(Exception e) {
        System.err.println(e);
        System.exit(1);
    }
}

static long run(String[] args) throws IOException {
    // CommandLine commandLine = parseCommandLine(args);
    return countOrders(parseCommandLine(args));
}

private static long countOrder(CommandLine commandLine) throws IOException {
    File input = Paths.get(filename).toFile();
    ObjectMapper mapper = new ObjectMapper();
    Order[] orders = mapper.readValue(input, Order[].class);
    if(commandLine.onlyCountReady) {
      return(Stream.of(orders).filter(o-> "read".equals(o.status)).count())
    } else {
        return(orders.length);
    } 
}

private static CommandLine parseCommandLine(String [] args) {
    if(args.length ==0) throw new RunTimeException("파일명을 입력하세요.");
    CommandLine result = new CommandLine();
    result.filename = args[args.length -1];
    result.onlyCountReady = Stream.of(args).anyMath(arg -> "-r".equals(arg));
    return result;
}
private static class CommandLine {
    boolean onlyCountReady;
    String filename;
}


//다른 리팩토링 법 

static long run(String [] args) throws IOException {
    // if(args.length ==0) throw new RunTimeException("파일명을 입력하세요.");
    CommandLine commandLine = new CommandLine(args);
    return countOrders(commandLine);
}

private static String filename(String[] args) {
    return args[args.length -1];
}
private static long countOrders(CommandLine commandLine) throws IOException {
    File input = Paths.get(commandLine.filename()).toFile();
    ObjectMapper mapper = new ObjectMapper();
    Order[] orders = mapper.readValue(input, Order[].class);
    if(commandLine.onlyCountReady()) {
       return (Stream.of(orders).filter(o-> "read".equals(o.status)).count())
    } else {
        return(orders.length);
    } 
}

public static class CommandLine {
    String[] args;

    public CommandLine(String[] args) {
        this.args = args;
        if(args.length ==0) throw new RunTimeException("파일명을 입력하세요.");
    }
    String filename() {
        return args[args.length -1];
    }
    boolean onlyCountReady( {
        return (Stream.of(args).anyMath(arg -> "-r".equals(arg));
    })
}




